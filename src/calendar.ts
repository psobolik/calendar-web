import {GridIterator} from "./grid_iterator";

export class Calendar {
    minWeeks = 6;
    weeks = this.minWeeks;
    year: number = 0;
    month: number = 0;
    day: number = 0;

    constructor() {
        this.buildGrid();
    }

    decYear() {
        this.showCalendar(this.year - 1, this.month, this.day);
    }

    incYear() {
        this.showCalendar(this.year + 1, this.month, this.day);
    }

    decMonth() {
        this.showCalendar(this.year, this.month - 1, this.day);
    }

    incMonth() {
        this.showCalendar(this.year, this.month + 1, this.day);
    }

    decWeek() {
        this.showCalendar(this.year, this.month, this.day - 7);
    }

    incWeek() {
        this.showCalendar(this.year, this.month, this.day + 7);
    }

    decDay() {
        this.showCalendar(this.year, this.month, this.day - 1);
    }

    incDay() {
        this.showCalendar(this.year, this.month, this.day + 1);
    }

    expand() {
        this.weeks += 2;
        this.buildGrid();
        this.showCalendar(this.year, this.month, this.day);
    }

    contract() {
        if (this.weeks <= this.minWeeks) return;

        this.weeks -= 2;
        this.buildGrid();
        this.showCalendar(this.year, this.month, this.day);
    }

    buildGrid() {
        const container = document.getElementById('calendar-container');
        if (container == null) return;

        while (container.lastElementChild)
            container.removeChild(container.lastElementChild);

        const gridIterator = new GridIterator(this.weeks, 7);
        while (gridIterator.hasMore()) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.id = gridIterator.toString();
            cell.style.gridRow = (gridIterator.row + 1).toString();
            cell.style.gridColumn = (gridIterator.col + 1).toString();

            cell.addEventListener("click", event => {
                const cell = event.target as HTMLElement;
                this.showCalendar(Number(cell.dataset["year"]), Number(cell.dataset["month"]), Number(cell.dataset["date"]));
            });
            container.append(cell);
            gridIterator.advance();
        }
    }

    gotoToday() {
        const today = new Date();
        this.showCalendar(today.getFullYear(), today.getMonth(), today.getDate());
    }

    showCalendar(year: number, month: number, day: number) {
        const selectedDate = new Date(year, month, day);
        showSelectedDate(selectedDate);
        this.year = selectedDate.getFullYear();
        this.month = selectedDate.getMonth();
        this.day = selectedDate.getDate();
        const day1 = new Date(this.year, this.month, 1);
        const dateCounter = getDay0(day1, this.weeks, this.minWeeks);
        const today = new Date();
        const gridIterator = new GridIterator(this.weeks, 7);
        while (gridIterator.hasMore()) {
            const showMonth = gridIterator.isFirstCell() || dateCounter.getDate() === 1;
            const cell = document.getElementById(gridIterator.toString());
            if (cell == null) return;
            cell.dataset["date"] = dateCounter.getDate().toString();
            cell.dataset["month"] = dateCounter.getMonth().toString();
            cell.dataset["year"] = dateCounter.getFullYear().toString();

            setClass(cell, 'current-month', dateCounter.getMonth() === day1.getMonth());
            setClass(cell, 'current-day', sameDate(today, dateCounter));
            setClass(cell, 'selected-day', sameDate(selectedDate, dateCounter));
            setClass(cell, 'show-month', showMonth);
            cell.innerText = forDisplay(dateCounter, showMonth);
            gridIterator.advance();
            dateCounter.setDate(dateCounter.getDate() + 1);
        }

        function setClass(cell: HTMLElement, className: string, test: boolean) {
            if (test) cell.classList.add(className);
            else cell.classList.remove(className);
        }

        function getDay0(day1: Date, weeks: number, minWeeks: number) {
            const dt = new Date(day1);
            dt.setDate((day1.getDate() - (7 * ((weeks - minWeeks) >> 1) + day1.getDay())));
            return dt;
        }

        function forDisplay(dt: Date, showMonth: boolean) {
            const date = dt.getDate();
            return `${(showMonth ? `${getMonthString(dt.getMonth())} ` : '')} ${date}`;
        }

        function getMonthString(month: number) {
            return ['January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'][month % 12];
        }

        function sameDate(date1: Date, dateB: Date) {
            return date1.getFullYear() === dateB.getFullYear()
                && date1.getMonth() === dateB.getMonth()
                && date1.getDate() === dateB.getDate();
        }

        function showSelectedDate(date: Date) {
            let dateDisplay = document.getElementById('date-display');
            if (dateDisplay)
                dateDisplay.innerText = `${getMonthString(date.getMonth())} ${date.getDate()}, ${date.getFullYear()}`;
        }
    }
}
