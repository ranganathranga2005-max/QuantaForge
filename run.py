"""
Unified Quantum Learning Platform Launcher
Runs Backend (FastAPI :8000) & Frontend (Vite :5173) simultaneously and automatically opens your browser.

Usage:
    python run.py
"""

import os
import sys
import subprocess
import time
import webbrowser
import signal
import urllib.request

ROOT_DIR = os.path.dirname(os.path.abspath(__file__))
BACKEND_DIR = os.path.join(ROOT_DIR, "backend")
FRONTEND_DIR = os.path.join(ROOT_DIR, "frontend")

processes = []

def cleanup(signum=None, frame=None):
    print("\n[Shutting down Quantum Platform services...]")
    for p in processes:
        try:
            if sys.platform == "win32":
                subprocess.call(['taskkill', '/F', '/T', '/PID', str(p.pid)], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
            else:
                p.terminate()
        except Exception:
            pass
    print("[Shutdown complete]")
    sys.exit(0)

signal.signal(signal.SIGINT, cleanup)
if hasattr(signal, 'SIGTERM'):
    signal.signal(signal.SIGTERM, cleanup)

def wait_for_backend(url="http://127.0.0.1:8000/api/health", timeout=15):
    start = time.time()
    while time.time() - start < timeout:
        try:
            with urllib.request.urlopen(url, timeout=1) as response:
                if response.status == 200:
                    return True
        except Exception:
            time.sleep(0.4)
    return False

def main():
    print("=" * 70)
    print("      >> QUANTUM ALGORITHM & SIMULATOR LEARNING PLATFORM <<")
    print("=" * 70)
    print(f"[*] Root Directory: {ROOT_DIR}")
    print("[*] Starting FastAPI Backend on http://localhost:8000 ...")

    # Start Backend
    backend_cmd = [sys.executable, "-m", "uvicorn", "app.main:app", "--host", "127.0.0.1", "--port", "8000", "--reload"]
    backend_proc = subprocess.Popen(
        backend_cmd,
        cwd=BACKEND_DIR,
        shell=(sys.platform == "win32")
    )
    processes.append(backend_proc)

    # Health check wait for backend
    print("[*] Waiting for backend services to initialize...")
    if wait_for_backend():
        print("[+] Backend initialized successfully!")
    else:
        print("[!] Backend startup took longer than expected, proceeding...")

    print("[*] Starting Vite Frontend on http://localhost:5173 ...")
    # Start Frontend
    npm_cmd = "npm.cmd" if sys.platform == "win32" else "npm"
    frontend_proc = subprocess.Popen(
        [npm_cmd, "run", "dev"],
        cwd=FRONTEND_DIR,
        shell=(sys.platform == "win32")
    )
    processes.append(frontend_proc)

    time.sleep(1.5)
    app_url = "http://localhost:5173"
    print(f"\n[+] All services active!")
    print(f"[+] Platform URL : {app_url}")
    print(f"[+] API Docs     : http://localhost:8000/docs")
    print(f"[*] Launching browser at {app_url}...\n")
    print("-" * 70)
    print("Press CTRL + C at any time in this terminal to stop both servers.")
    print("-" * 70)

    try:
        webbrowser.open(app_url)
    except Exception:
        pass

    try:
        while True:
            time.sleep(1)
            for p in processes:
                if p.poll() is not None:
                    print(f"\n[!] A service terminated with code {p.returncode}")
                    cleanup()
    except KeyboardInterrupt:
        cleanup()

if __name__ == "__main__":
    main()
