etherpad_bootstrap
==================

Requires:
- pm2
- grunt-cli
- nodejs

0. sh bootstrap.sh - do all the things
1. grunt [default task] - gets content from repositories and starts the app
2. grunt start - start
3. grunt stop - stop
4. grunt kill - stop & delete from pm2 daemon
5. grunt reload - 0 down-time reload of app
