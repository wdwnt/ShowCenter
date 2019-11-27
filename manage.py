#!/usr/bin/env python
import os
import sys

if __name__ == "__main__":
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "WDWNTShowCenter.settings")

    if sys.platform == 'win32':
        # There's some bullshit you need to do to get this to run in Windows. I'm sorry.
        # Sauce and related core Python bug: https://bugs.python.org/issue37373 & https://bugs.python.org/msg355991
        import asyncio
        asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())

    from django.core.management import execute_from_command_line

    execute_from_command_line(sys.argv)
