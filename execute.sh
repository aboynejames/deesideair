#!/bin/bash

echo "Beginning Entrypoint script execution."

output=$(python3 get_luftdaten_data.py)
status=$?

echo "Air Aberdeen Data Collected."

# Change this to your project
gcloud config set project your-project-id

# Add this service account to the root of your source repo dir. It's a SA with the Log writter and Custom VM delete Role.
gcloud auth activate-service-account --key-file=your-project-id-json.json

gcloud logging write batch-workload "[$(hostname)]Exit status from python cmd: $status"
gcloud logging write batch-workload "[$(hostname)]Output from python cmd: $output"

echo "Entrypoint script execution finished. Time for cleanup."

# Delete the VM
gcp_zone=$(curl -H Metadata-Flavor:Google http://metadata.google.internal/computeMetadata/v1/instance/zone -s | cut -d/ -f4)
gcloud compute instances delete $(hostname) --zone ${gcp_zone}