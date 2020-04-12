package tim.app.web

interface DependencyProvider<T> {
    fun getInstance(): T
}
