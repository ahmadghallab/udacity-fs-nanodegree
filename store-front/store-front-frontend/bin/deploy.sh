aws s3 cp --recursive --acl public-read ./build s3://fs-frontend/
aws s3 cp --acl public-read --cache-control="max-age=0, no-cache, no-store, must-revalidate" ./build/index.html s3://fs-frontend/