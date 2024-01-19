#!/bin/bash

function create_upstream() {
 local url="http://127.0.0.1:9180/apisix/admin/upstreams/1"
 local payload='{
   "nodes": [
     {
       "host": "host.docker.internal",
       "port": 8080,
       "weight": 1
     }
   ],
   "timeout": {
     "connect": 6,
     "send": 6,
     "read": 6
   },
   "type": "roundrobin",
   "scheme": "http",
   "pass_host": "pass",
   "name": "Ticket system api",
   "keepalive_pool": {
     "idle_timeout": 60,
     "requests": 1000,
     "size": 320
   }
 }'

 curl -i "$url" -X PUT -d "$payload"
}


function create_route() {
 local url="http://127.0.0.1:9180/apisix/admin/routes/1"
 local payload='{
  "uris": [
    "/tickets/*",
    "/tickets"
  ],
  "name": "my-tickets-system-api",
  "plugins": {
    "basic-auth": {
      "_meta": {
        "disable": true
      },
      "hide_credentials": false
    },
    "cors": {
      "_meta": {
        "disable": false
      },
      "allow_credential": false,
      "allow_headers": "*",
      "allow_methods": "*",
      "allow_origins": "*",
      "expose_headers": "*",
      "max_age": 5
    },
    "openid-connect": {
      "_meta": {
        "disable": false
      },
      "bearer_only": true,
      "client_id": "apisix",
      "client_secret": "nP6BwbjHAUzlVS0JcYatvNhlyTTfXi94",
      "discovery": "http://host.docker.internal:8081/realms/refine/.well-known/openid-configuration",
      "introspection_endpoint": "http://host.docker.internal:8081/realms/refine/protocol/openid-connect/token/introspect",
      "introspection_endpoint_auth_method": "client_secret_basic",
      "realm": "refine"
    }
  },
  "upstream_id": "1",
  "status": 1
}'

 # Execute the curl command
 curl -i "$url" -X PUT -d "$payload"
}

create_upstream

create_route
