# filepath: /workspaces/heiraid/scripts/provision_maps.sh
#!/bin/sh
set -e

# Variables (replace with your pipeline variables or set defaults)
RESOURCE_GROUP=${AZURE_MAPS_RESOURCE_GROUP:-$AZURE_RESOURCE_GROUP}
MAPS_ACCOUNT_NAME=${AZURE_MAPS_ACCOUNT_NAME:-heiraidmaps}
LOCATION=${AZURE_MAPS_LOCATION:-eastus}

# Create Azure Maps account
az maps account create \
  --name "$MAPS_ACCOUNT_NAME" \
  --resource-group "$RESOURCE_GROUP" \
  --location "$LOCATION" \
  --sku "S1"