#!/usr/bin/env bash

# TO INTEGRATE, ADD WHITELISTED SERVERS LIST TO $WHITELISTED_SERVERS, 
# ie. 'google.com:8080 microsoft.com:80',AND DISABLE $ALLOW_DNS BY MODIFYING IT TO '1'

disableNetwork() {

startTime=$(date +%s)
{
IPT="iptables"
dnsServers=$(grep -oP "(?<=nameserver ).*" /etc/resolv.conf | tr "\n" " ")

function parseUrl {
URL="$1" python - <<END
from urlparse import urlparse
import os
addr = os.environ['URL']
if addr.find('://') == -1:
  url = urlparse('//'+addr, 'http')
else:
  url = urlparse(addr)
print url.hostname
print url.port if url.port is not None else "80"
END
}


echo "Setting iptables to drop all connections."
$IPT -P INPUT   DROP
$IPT -P FORWARD DROP
$IPT -P OUTPUT  DROP


# Allow DNS lookups if env ALLOW_DNS is set to 1
if [ ${ALLOW_DNS} -eq 1 ]
then
  for ip in $dnsServers
  do
    echo "Allowing DNS lookups (tcp, udp port 53) to server '$ip'"
    $IPT -A OUTPUT -p udp -d $ip --dport 53 -m state --state NEW,ESTABLISHED -j ACCEPT
    $IPT -A INPUT  -p udp -s $ip --sport 53 -m state --state ESTABLISHED     -j ACCEPT
    $IPT -A OUTPUT -p tcp -d $ip --dport 53 -m state --state NEW,ESTABLISHED -j ACCEPT
    $IPT -A INPUT  -p tcp -s $ip --sport 53 -m state --state ESTABLISHED     -j ACCEPT
  done
fi

for server in $WHITELISTED_SERVERS
do

  url=$(parseUrl "${server}")
  urlParts=($url)
  host=${urlParts[0]}
  port=${urlParts[1]}


  echo "Allowing connections to '$host' on port $port"
  $IPT -A OUTPUT -p tcp -d "$host" --dport $port  -m state --state NEW,ESTABLISHED -j ACCEPT
  $IPT -A INPUT  -p tcp -s "$host" --sport $port  -m state --state ESTABLISHED     -j ACCEPT
done
} 2>&1
status=$?
duration=$(($(date +%s) - $startTime))
date=$(date --utc +%FT%T.%3NZ)

printf "</DISABLE_NETWORK_ACCESS exitcode=%d, completed=%s, duration=%ds>\n\n\n" "${status}" "${date}" "${duration}"

if [ $status -ne 0 ]
then
  exit 22
fi
}

# ##############################################################################
# DISABLE NETWORK ACCESS
# ##############################################################################

printf "<DISABLE_NETWORK_ACCESS>\n"

# Configure the firewall to block all connections except those explicitly allowed
# Exit if problem configuring the firewall

if [[ -z ${ALLOW_DNS+x} ]]
then
  echo "Network Access is not being modified because you are working in local development environment."
else
  disableNetwork
fi

printf "</DISABLE_NETWORK_ACCESS>\n\n"
