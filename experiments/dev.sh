#!/usr/bin/env bash
set -Eeuo pipefail

readonly LAB_ROOT="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
readonly HOST="127.0.0.1"
readonly PORT="${PORT:-4173}"
readonly URL="http://${HOST}:${PORT}/"

if ! [[ "${PORT}" =~ ^[0-9]+$ ]] || ((PORT < 1 || PORT > 65535)); then
  echo "PORT must be an integer between 1 and 65535." >&2
  exit 1
fi

listener_pids() {
  if command -v lsof >/dev/null 2>&1; then
    lsof -nP -tiTCP:"${PORT}" -sTCP:LISTEN 2>/dev/null || true
    return
  fi

  if command -v fuser >/dev/null 2>&1; then
    fuser -n tcp "${PORT}" 2>/dev/null | tr ' ' '\n' | grep -E '^[0-9]+$' || true
    return
  fi

  if command -v powershell.exe >/dev/null 2>&1; then
    powershell.exe -NoProfile -NonInteractive -Command \
      "Get-NetTCPConnection -LocalPort ${PORT} -State Listen -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -Unique" \
      2>/dev/null | tr -d '\r ' | grep -E '^[0-9]+$' || true
  fi
}

stop_listeners() {
  local -a pids=("$@")

  if command -v powershell.exe >/dev/null 2>&1 && [[ "${OS:-}" == "Windows_NT" ]]; then
    local joined
    joined="$(IFS=,; echo "${pids[*]}")"
    powershell.exe -NoProfile -NonInteractive -Command \
      "\$processIds = @(${joined}); foreach (\$processId in \$processIds) { Stop-Process -Id \$processId -Force -ErrorAction SilentlyContinue }" \
      >/dev/null 2>&1 || true
    return
  fi

  kill "${pids[@]}" 2>/dev/null || true
  for _ in {1..30}; do
    mapfile -t pids < <(listener_pids)
    ((${#pids[@]} == 0)) && return
    sleep 0.1
  done
  kill -KILL "${pids[@]}" 2>/dev/null || true
}

free_port() {
  local -a pids=()
  mapfile -t pids < <(listener_pids)
  ((${#pids[@]} == 0)) && return

  echo "Port ${PORT} is in use; stopping listener(s): ${pids[*]}"
  stop_listeners "${pids[@]}"

  for _ in {1..30}; do
    mapfile -t pids < <(listener_pids)
    ((${#pids[@]} == 0)) && return
    sleep 0.1
  done

  echo "Could not release port ${PORT}." >&2
  exit 1
}

cd "${LAB_ROOT}"

if ! command -v npm >/dev/null 2>&1; then
  echo "npm is required to run the exercise lab." >&2
  exit 1
fi

if [[ ! -e node_modules/.bin/vite && ! -e node_modules/.bin/vite.cmd ]]; then
  echo "Installing locked lab dependencies..."
  npm ci
fi

free_port

echo "Checking the complete exercise catalog..."
npm run check

echo "Opening ${URL}"
exec npm run dev -- --host "${HOST}" --port "${PORT}" --strictPort --open
