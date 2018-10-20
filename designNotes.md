Workflow Actions
================
* (required) create youtube live event - including tagging and thumbnail
* (required) embedding in the wdwntunes page in wordpress (and also the wigs-only version) - multiple videos embedded at a time
* (wanted) making a wordpress post
* (wanted) make a post in slack
* (wanted) tweeting
* (wanted) post to patreon
* (wanted) instagram
* (much later) upload podcast to FTP server and tag it
* (much later) metrics


Database Design
===============
Show has:
- name
- Template List
- template properties
- Episodes

Episode has:
- name
- created by
- time created
- recoreding start time
- properties
- Video (can be null)
- Action List
- Credits (go look at the credits table)

Video has:
- name
- start time
- display time
- remove time
- platform name
- platform ID
- description
- tags
- thumbnail

Credits has:
- Episode
- person
- role

Template List:
- name
- show
- ordinal (pos in list)
- type
- timeOffset (can be null)
- config (json)

Action List:
- name
- episode
- ordinal
- type
- config
- status (NOT_DONE, DONE, ERROR, QUEUED, NEEDS_REVIEW)
- executionTime (null unless status is QUEUED or NEEDS_REVIEW (for scheduled) or DONE (for when it happened))
- last modified
- modified by


(much later) BACKGROUND/CLOCK PROCESS
=====================================
* look through the whole action list
* find any QUEUED actions that should have been run but haven't
* do'em