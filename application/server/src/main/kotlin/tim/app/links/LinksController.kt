package tim.app.links

import io.micronaut.http.MediaType
import io.micronaut.http.annotation.Controller
import io.micronaut.http.annotation.Get
import io.micronaut.http.annotation.Produces
import io.micronaut.http.annotation.Put

@Controller("links")
class LinksController {

    @Get("/")
    @Produces(MediaType.TEXT_PLAIN)
    fun index(): String = "Some fancy string"

    @Put("/")
    @Produces(MediaType.APPLICATION_JSON)
    fun create(): String = ""
}