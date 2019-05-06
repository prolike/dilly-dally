### Importing backup data
---
With **[gcloud](https://cloud.google.com/sdk/docs/quickstarts)** installed and connected to the project on your command-line run the following command:
```
$ gcloud beta firestore import gs://[BUCKET_NAME]/[EXPORT_PREFIX]/
```
Replace `[BUCKET_NAME]` with the targeted Cloud Storage Bucket and `[EXPORT_PREFIX]` with the desired backup folder within the Bucket.

Example:
```
$ gcloud beta firestore import gs://prolike-stack-prod1.appspot.com/2019-05-05-14-37-02/
```

**NOTE that you need to run the command with** `sudo` **!**

If you haven't got the **gcloud** tools installed, you can access them by using the project's **[Cloud Shell](https://console.cloud.google.com/home/dashboard?project=prolike-stack-prod1&cloudshell=true)** to run the same command.

Documentation can be found [here](https://firebase.google.com/docs/firestore/manage-data/export-import).

### Backup information
---
Scheduled backup information can be found by running the following:
```
$ gcloud app browse
```
[This will open the backup Bucket URL in your browser.](http://prolike-stack-prod1.appspot.com/)
