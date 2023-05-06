# Setup for local development

Previewing changes to / Editing the hulks.de / rohow.de webiste is fairly simple:

1. Clone either hulks.de or rohow.de:
    - hulks.de: `git clone git@github.com:HULKs/hulks.github.io.git`
    - rohow.de: `git clone git@github.com:RHOrga/rhorga.github.io.git` (special access rights required)
2. Install `docker` and `docker-compose`:
    - `sudo pacman -S docker docker-compose`
    - `sudo gpasswd -a <<USERNAME>> docker`
    - Logout & login again to apply group changes.
    - start the docker service (systemd: `systemctl start docker.service`, to enable it during boot: `systemctl enable docker.service`)
3. cd to the cloned repository and execute `docker-compose up`
4. go to `http://0.0.0.0:4000` within your browser. The website should be displayed there.

You can now make changes. Once you saved a file it will be automatically updated on the local website (reload the page in the browser).

# Apply local changes

1. commit
2. push to master
3. ???
4. Profit
