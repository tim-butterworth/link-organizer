package tim

import java.net.URI
import java.nio.file.Paths

fun main() {
    val clientDir = URI.create("file:///Users/swathimakkena/workspace/links/application/client")
    val clientFile = Paths.get(clientDir).toFile()

    println(clientFile.isDirectory)

    val processBuilder = ProcessBuilder()
            .directory(clientFile)
            .command(mutableListOf("yarn", "start"))

    val entries = processBuilder.environment().entries

    entries.forEach { entry ->
        println("${entry.key} -> ${entry.value}")
    }

    val command = processBuilder
            .start()

    val errorStream = command.errorStream
    val inputStream = command.inputStream

    Thread {
        do {
            val out = errorStream.read()
            println(out.toChar())
        } while (out != -1)

        errorStream.close()
    }.start()
    Thread {
        do {
            val out = inputStream.read()
            println(out.toChar())
        } while (out != -1)

        inputStream.close()
    }.start()

    Thread.sleep(10000)

    command.descendants().forEach {
        println(it.pid())
        println(it.info())

        it.destroy()
    }

    command.destroy()
}