package tim.app.web.links

import tim.app.core.links.LinkCreator
import tim.app.web.DependencyProvider
import javax.inject.Singleton

@Singleton
class LinkCreatorProvider: DependencyProvider<LinkCreator> {
    override fun getInstance(): LinkCreator = LinkCreator()
}