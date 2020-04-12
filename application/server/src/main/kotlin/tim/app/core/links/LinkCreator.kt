package tim.app.core.links

import java.util.*

class LinkCreator {

    private val linkMap: MutableMap<UUID, CreateLinkRequest> = mutableMapOf()

    fun createLink(request: CreateLinkRequest): CreateLinkResponse {
        val random = Random()

        return if (random.nextBoolean()) {
            val id: UUID = UUID.randomUUID()

            linkMap[id] = request

            CreateLinkSuccessResponse(id = id)
        } else {
            CreateLinkFailureResponse
        }
    }
}