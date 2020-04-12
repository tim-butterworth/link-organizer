package tim.app.core.links

import java.util.*

sealed class CreateLinkResponse
data class CreateLinkSuccessResponse(
        val id: UUID
): CreateLinkResponse()
object CreateLinkFailureResponse: CreateLinkResponse()