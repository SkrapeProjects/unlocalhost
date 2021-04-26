# Unlocalhost

A simple website to create redirects to localhost.  
The website uses [cookies](COOKIES.md).  

---  

## What does the website do?  

This website can be configured to redirect to a full localhost address.  
By full localhost address I mean an address of the type:  
`https://localhost:1234/endpoint`  
If the incoming request contains a query string in the url it will be passed through.  
`https://localhost:1234/endpoint?param=value`  
or with multiple parameters  
`https://localhost:1234/endpoint?param1=value1&param2=value2`  
