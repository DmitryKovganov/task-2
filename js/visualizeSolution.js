(function (root) {
    const exploreMap = root.SHRI_ISLANDS.exploreMap;

    /**
     * Бонусное задание.
     * Необходимо взять реализацию функции solution и доработать,
     * добавив функционал, который позволит пошагово визуализировать работу данного алгоритма.
     * Сигнатуру функции можно выбрать наиболее удобную для вашей визуализации
     */
    function visualizeSolution(map) {
        let explorator = exploreMap(map);
        return () => explorator.next();
    }

    root.SHRI_ISLANDS.visualizeSolution = visualizeSolution;
})(this);
