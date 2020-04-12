rootProject.name = "links"

include("server")
project(":server").projectDir = file("application/server")

include("client")
project(":client").projectDir = file("application/client")