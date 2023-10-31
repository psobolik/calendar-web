import { Calendar } from "./calendar";

const g_calendar = new Calendar();

window.addEventListener('load', _ => {
    function addEventListener<K extends keyof HTMLElementEventMap>(id: string, type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any): void {
        let el = document.getElementById(id);
        if (el)
            el.addEventListener(type, listener);
    }
    addEventListener('prev-day-button', 'click', g_calendar.decDay.bind(g_calendar));
    addEventListener('next-day-button', 'click', g_calendar.incDay.bind(g_calendar));
    addEventListener('prev-week-button', 'click', g_calendar.decWeek.bind(g_calendar));
    addEventListener('next-week-button', 'click', g_calendar.incWeek.bind(g_calendar));
    addEventListener('prev-month-button', 'click', g_calendar.decMonth.bind(g_calendar));
    addEventListener('next-month-button', 'click', g_calendar.incMonth.bind(g_calendar));
    addEventListener('prev-year-button', 'click', g_calendar.decYear.bind(g_calendar));
    addEventListener('next-year-button', 'click', g_calendar.incYear.bind(g_calendar));
    addEventListener('show-more-button', 'click', g_calendar.expand.bind(g_calendar));
    addEventListener('show-less-button', 'click', g_calendar.contract.bind(g_calendar));
    addEventListener('today-button', 'click', g_calendar.gotoToday.bind(g_calendar));

    document.addEventListener('keyup', evt => {
        switch (evt.code) {
            case 'PageUp':
                g_calendar.decMonth();
                break;
            case 'PageDown':
                g_calendar.decMonth();
                break;
            case 'Equal':
            case 'NumpadAdd':
            case 'Insert':
                    g_calendar.expand();
                break;
            case 'Minus':
            case 'NumpadSubtract':
            case 'Delete':
                    g_calendar.contract();
                break;
            case 'ArrowLeft':
                g_calendar.decDay();
                break;
            case 'ArrowRight':
                g_calendar.incDay();
                break;
            case 'ArrowUp':
                g_calendar.decWeek();
                break;
            case 'ArrowDown':
                g_calendar.incWeek();
                break;
            case 'Home':
                g_calendar.gotoToday();
                break;
        }
    });
    g_calendar.gotoToday();
});
