plugins {
    kotlin("jvm") version "1.3.50"
    id("org.jetbrains.kotlin.kapt") version "1.3.50"
    id("org.jetbrains.kotlin.plugin.allopen") version "1.3.50"
    id("com.github.johnrengelman.shadow") version "5.2.0"
    application
}

version = "0.1"
group = "tim.app"

repositories {
    mavenCentral()
    maven { url = uri("https://jcenter.bintray.com") }
}

// for dependencies that are needed for development only
val developmentOnlyConfigName = "developmentOnly"
configurations.create(developmentOnlyConfigName)
val developmentOnlyConfig = configurations.getByName(developmentOnlyConfigName)

val jarToCopyConfigName = "jarToCopy"
configurations.create(jarToCopyConfigName)
val jarToCopyConfig = configurations.getByName(jarToCopyConfigName)

val micronautVersion = "1.3.3"
val kotlinVersion = "1.3.50"

dependencies {
    implementation(platform("io.micronaut:micronaut-bom:$micronautVersion"))
    implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8:${kotlinVersion}")
    implementation("org.jetbrains.kotlin:kotlin-reflect:${kotlinVersion}")
    implementation("io.micronaut:micronaut-runtime")
    implementation("javax.annotation:javax.annotation-api")
    implementation("io.micronaut:micronaut-http-server-netty")
    implementation("io.micronaut:micronaut-http-client")
    kapt(platform("io.micronaut:micronaut-bom:$micronautVersion"))
    kapt("io.micronaut:micronaut-inject-java")
    kapt("io.micronaut:micronaut-validation")
    kaptTest(platform("io.micronaut:micronaut-bom:$micronautVersion"))
    kaptTest("io.micronaut:micronaut-inject-java")
    runtimeOnly("com.fasterxml.jackson.module:jackson-module-kotlin:2.9.8")
    runtimeOnly("ch.qos.logback:logback-classic:1.2.3")
    testImplementation(platform("io.micronaut:micronaut-bom:$micronautVersion"))
    testImplementation("io.micronaut.test:micronaut-test-kotlintest")
    testImplementation("io.mockk:mockk:1.9.3")
    testImplementation("io.kotlintest:kotlintest-runner-junit5:3.3.2")

    jarToCopyConfig("org.clojure:clojure:1.10.1")
}

application {
    mainClassName = "tim.app.Application"
}

tasks.test {
    useJUnitPlatform()
    classpath += developmentOnlyConfig
}

allOpen {
    annotation("io.micronaut.aop.Around")
}

tasks {
    compileKotlin {
        kotlinOptions {
            jvmTarget = "1.8"
            javaParameters = true
        }
    }

    compileTestKotlin {
        kotlinOptions {
            jvmTarget = "1.8"
            javaParameters = true
        }
    }

    shadowJar {
        mergeServiceFiles()
    }
}

tasks.withType<JavaExec> {
    classpath += developmentOnlyConfig
    jvmArgs("-noverify", "-XX:TieredStopAtLevel=1", "-Dcom.sun.management.jmxremote")
}

task<Copy>("copyClojure") {
    from(jarToCopyConfig)
    into("clojure")
}
