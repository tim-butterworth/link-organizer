package tim.app

import io.micronaut.runtime.Micronaut

object Application {

    @JvmStatic
    fun main(args: Array<String>) {
        Micronaut.build()
                .packages("tim.app")
                .mainClass(Application.javaClass)
                .start()
    }
}