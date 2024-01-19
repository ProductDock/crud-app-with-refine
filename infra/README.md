# Infra

## Setup

1. Run docker compose: `docker-compose up -d` and wait for 30-40 seconds
2. Login to keycloak: `http://localhost:8081` with `admin/admin`
3. Switch to `refine` realm
4. Create a user `jz`. Set password and don't make it temp.
5. Go to `Clients -> apisix` and regenerate `Client secret` in `Credentials` tab
6. Take that secret and paste it in `configure-apisix.sh` under `client_secret` in creating_route function.
7. Now configure apisix by running: `./configure-apisix.sh`
8. You can check out apisix configuration via dashboard on `http://localhost:9005` and login with `admin/admin`

## Destroy

Run: `docker-compose down -v`