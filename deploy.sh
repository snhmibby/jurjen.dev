#!/bin/sh
hugo && rsync -avz --delete public/ jurjen.dev:~/www.jurjen.dev
