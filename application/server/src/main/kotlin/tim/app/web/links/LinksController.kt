package tim.app.web.links

import io.micronaut.http.HttpResponse
import io.micronaut.http.MediaType
import io.micronaut.http.annotation.*
import io.reactivex.Single
import tim.app.core.links.CreateLinkFailureResponse
import tim.app.core.links.CreateLinkRequest
import tim.app.core.links.CreateLinkSuccessResponse

@Controller("links")
class LinksController(
        private val linkCreatorProvider: LinkCreatorProvider
) {

    private val linkCreator = linkCreatorProvider.getInstance()

    @Get("/")
    @Produces(MediaType.TEXT_PLAIN)
    fun index(): String = "Some fancy string"

    @Put("/")
    @Produces(MediaType.APPLICATION_JSON)
    fun create(): String = ""

    @Get("/dostuff")
    @Produces(MediaType.TEXT_PLAIN)
    fun doStuff(): Single<String> = Single.just("Nifty")

    @Post("/")
    @Produces(MediaType.APPLICATION_JSON)
    fun createLink(linkCreationRequest: LinkCreationRequest): HttpResponse<LinkCreationResult> {
        val createLink = linkCreator.createLink(
                request = CreateLinkRequest(
                        url = linkCreationRequest.url,
                        description = linkCreationRequest.description
                )
        )

        return when (createLink) {
            is CreateLinkFailureResponse -> {
                HttpResponse.serverError(LinkCreationResult(createLink))
            }
            is CreateLinkSuccessResponse -> {
                HttpResponse.ok(LinkCreationResult(createLink))
            }
        }
    }
}