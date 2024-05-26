#!/bin/sh
cat <<EOF > /usr/share/nginx/html/env-config.json
{
  "AWS_REGION": "${AWS_REGION}",
  "AWS_ACCESS_KEY_ID": "${AWS_ACCESS_KEY_ID}",
  "AWS_SECRET_ACCESS_KEY": "${AWS_SECRET_ACCESS_KEY}",
  "S3_BUCKET_NAME": "${S3_BUCKET_NAME}",
  "USE_LOCALSTACK": "${USE_LOCALSTACK}"
}
EOF