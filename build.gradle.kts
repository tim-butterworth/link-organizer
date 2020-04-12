version = "0.1"
group = "tim.app"

task<Copy>("copyClient") {
    from("$projectDir/application/client/build")
    into("$projectDir/application/server/src/main/resources/public")
}