#!/bin/sh
cat <<EOF > /usr/share/nginx/html/env-config.json
{
  "AWS_REGION": "${AWS_REGION}",
  "AWS_IDENTITY_POOL_ID": "${AWS_IDENTITY_POOL_ID}",
  "S3_BUCKET_NAME": "${S3_BUCKET_NAME}",
  "USE_LOCALSTACK": "${USE_LOCALSTACK}"
}
EOF
