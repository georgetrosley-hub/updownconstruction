#!/usr/bin/env python3
"""Remove outer black background via flood-fill from image edges (keeps inner logo blacks)."""
from __future__ import annotations

import sys
from collections import deque

from PIL import Image


def is_bg_black(r: int, g: int, b: int, thresh: int) -> bool:
    return r <= thresh and g <= thresh and b <= thresh


def main() -> None:
    src = sys.argv[1]
    dst = sys.argv[2]
    thresh = int(sys.argv[3]) if len(sys.argv) > 3 else 42

    im = Image.open(src).convert("RGBA")
    w, h = im.size
    flat = list(im.getdata())
    visited = [False] * (w * h)

    def idx(x: int, y: int) -> int:
        return y * w + x

    def push(q: deque[tuple[int, int]], x: int, y: int) -> None:
        if not (0 <= x < w and 0 <= y < h):
            return
        i = idx(x, y)
        if visited[i]:
            return
        r, g, b, _a = flat[i]
        if not is_bg_black(r, g, b, thresh):
            return
        visited[i] = True
        q.append((x, y))

    q: deque[tuple[int, int]] = deque()
    for x in range(w):
        push(q, x, 0)
        push(q, x, h - 1)
    for y in range(h):
        push(q, 0, y)
        push(q, w - 1, y)

    while q:
        x, y = q.popleft()
        i = idx(x, y)
        r, g, b, _a = flat[i]
        flat[i] = (r, g, b, 0)
        for dx, dy in ((0, 1), (0, -1), (1, 0), (-1, 0)):
            nx, ny = x + dx, y + dy
            if not (0 <= nx < w and 0 <= ny < h):
                continue
            ni = idx(nx, ny)
            if visited[ni]:
                continue
            r2, g2, b2, _a2 = flat[ni]
            if not is_bg_black(r2, g2, b2, thresh):
                continue
            visited[ni] = True
            q.append((nx, ny))

    out = Image.new("RGBA", (w, h))
    out.putdata(flat)
    out.save(dst, optimize=True)
    print(f"Wrote {dst} ({w}x{h})")


if __name__ == "__main__":
    main()
