ncr-ui
=============

## Installation

+ grab a copy of the repository:

`https://github.com/robbarnsley/ncr-ui`

+ install/update node packages in package.json

`npm install`

+ install cfitsio and libpng devel packages

`yum install cfitsio-devel libpng-devel`

+ add rules to iptables, e.g.

`iptables -I INPUT 6 -p tcp --dport 2718 -j ACCEPT`

`iptables -I INPUT 6 -p tcp --dport 3001 -j ACCEPT`

`iptables -I INPUT 6 -p tcp --dport 5001 -j ACCEPT`

+ make and install js9Helper (js/libs/js9/ directory), js9 Makefile may need to be altered to include util/astroem directories in INC flags.

`./configure --with-webdir="../" --with-helper="nodejs" --with-cfitsio="/usr/"`

`./make`

`su; make install`

+ build wcstools/sky2xy in src/ directory

`make sky2xy`

+ make js9Xeq executable

`chmod 755 js9Xeq`

+ install python packages

`pip install pyregion numpy matplotlib pyfits astropy shortuuid`

`easy_install photutils`

## Running

+ edit config files (*_dir paths in config.json, and http/ws hosts in app/js/config.json)

+ start node http, webservice and js9 helper (in root directory, not js/jS9!):

`node index.js`

`node ws.js`

`node js9Helper.js`



