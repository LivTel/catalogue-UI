function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function hms2dec(HMS) {
  if (isNumeric(HMS)) {
    return HMS
  } else if (HMS.split(':').length != 3) {
     return false
  } else {
     ra = (HMS.split(':')[0]*15) + (HMS.split(':')[1]*(15/60)) + (HMS.split(':')[2]*(15/3600));
     return ra
  }
}
    
function dms2dec(DMS) {
  if (isNumeric(DMS)) {
    return DMS
  } else if (DMS.split(':').length != 3) {
    return false
  } else {
    if (DMS[0] == '-') {
      dec = -1 * ( (DMS.split(':')[0]*-1) + (DMS.split(':')[1]*(1/60)) + (DMS.split(':')[2]*(1/3600)) );
    } else {
      dec = 1 * ( (DMS.split(':')[0]*1) + (DMS.split(':')[1]*(1/60)) + (DMS.split(':')[2]*(1/3600)) )
    }
    return dec
  }
}