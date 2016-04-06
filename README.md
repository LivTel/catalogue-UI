Skycam-UI
=============

# Overview

This package provides a prototype framework for visualising Skycam data. It is written in Backbone.js. 
Some of the parameter names and directories are relics of porting the structure from a different project. 

# Installation

1. Clone the repository

2. Edit `config.json` configuration file. Change `_*.dir` parameters to match package path distribution 
and `db_*` to point to whereever the Skycam database is held. This requires that the database is 
served externally without a password

3. Start serving files through (`node http.js`) and start webservice (`node ws.js`) 

4. Point browser to `localhost:[http_port]` where [**http\_port**] is the port specified in `config.json` 
(default 5002)

# Known Issues

Currently the cone search is performed by connecting directly to the database. This should be superceded by
a call to the catalogue-webservices SCS routine (i.e. within a model).
