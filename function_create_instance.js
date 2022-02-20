const Buffer = require('safe-buffer').Buffer;
const Compute = require('@google-cloud/compute');
const compute = new Compute();

// Change this const value to your project
const projectId = "your-project-ID";
const zone = "europe-west2-c";

const vmConfig ={
    "kind": "compute#instance",
    "zone": "projects/your-project-ID/zones/europe-west2-c",
    "machineType": "projects/your-project-ID/zones/europe-west2-c/machineTypes/f1-micro",
    "displayDevice": {
      "enableDisplay": false
    },
    "metadata": {
      "kind": "compute#metadata",
      "items": [
        {
          "key": "gce-container-declaration",
          "value": "spec:\n  containers:\n    - name: air-aberdeen-luftdaten-batch\n      image: 'gcr.io/your-project-ID/air_aberdeen_data_stack:latest'\n      stdin: false\n      tty: false\n  restartPolicy: Always\n\n# This container declaration format is not public API and may change without notice. Please\n# use gcloud command-line tool or Google Cloud Console to run Containers on Google Compute Engine."
        },
        {
          "key": "google-logging-enabled",
          "value": "true"
        }
      ]
    },
    "tags": {
      "items": []
    },
    "disks": [
      {
        "kind": "compute#attachedDisk",
        "type": "PERSISTENT",
        "boot": true,
        "mode": "READ_WRITE",
        "autoDelete": true,
        "deviceName": "air-aberdeen-luftdaten-batch",
        "initializeParams": {
          "sourceImage": "projects/cos-cloud/global/images/cos-stable-89-16108-470-11",
          "diskType": "projects/your-project-ID/zones/europe-west2-c/diskTypes/pd-balanced",
          "diskSizeGb": "10"
        },
        "diskEncryptionKey": {}
      }
    ],
    "canIpForward": false,
    "networkInterfaces": [
      {
        "kind": "compute#networkInterface",
        "subnetwork": "projects/your-project-ID/regions/europe-west2/subnetworks/default",
        "accessConfigs": [
          {
            "kind": "compute#accessConfig",
            "name": "External NAT",
            "type": "ONE_TO_ONE_NAT",
            "networkTier": "PREMIUM"
          }
        ],
        "aliasIpRanges": []
      }
    ],
    "description": "",
    "labels": {
      "container-vm": "cos-stable-89-16108-470-11"
    },
    "scheduling": {
      "preemptible": false,
      "onHostMaintenance": "MIGRATE",
      "automaticRestart": true,
      "nodeAffinities": []
    },
    "deletionProtection": false,
    "reservationAffinity": {
      "consumeReservationType": "ANY_RESERVATION"
    },
    "serviceAccounts": [
      {
        "email": "734723733565-compute@developer.gserviceaccount.com",
        "scopes": [
          "https://www.googleapis.com/auth/devstorage.read_only",
          "https://www.googleapis.com/auth/logging.write",
          "https://www.googleapis.com/auth/monitoring.write",
          "https://www.googleapis.com/auth/servicecontrol",
          "https://www.googleapis.com/auth/service.management.readonly",
          "https://www.googleapis.com/auth/trace.append"
        ]
      }
    ],
    "shieldedInstanceConfig": {
      "enableSecureBoot": false,
      "enableVtpm": true,
      "enableIntegrityMonitoring": true
    },
    "confidentialInstanceConfig": {
      "enableConfidentialCompute": false
    }
  }
exports.createInstance = (event, context) => {
  const vmName = "air-aberdeen-luftdaten-batch" + Date.now();
  try {
    compute.zone(zone)
      .createVM(vmName, vmConfig)
      .then(data => {
        // Operation pending.
        const vm = data[0];
        const operation = data[1];
        console.log('VM being created: ${vm.id}');
        console.log('Operation info: ${operation.id}');
        return operation.promise();
      })
      .then(() => {
        const message = 'VM created with success, Cloud Function finished execution.';
        console.log(message);
      })
      .catch(err => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
  }
};