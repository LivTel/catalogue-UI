var cproc  = require("child_process");

cproc.execFile("js9helper", ["-i", "../../../../jobs/as4isavp0/GALEX_SS.fits"],
		   { encoding: "utf8",
		     timeout: 0,
		     maxBuffer: 1024,
		     killSignal: "SIGTERM",
		     cwd: "",
		     env: ""
		   },
			function(errcode, stdout, stderr) {
  console.log(stderr);
}

);
