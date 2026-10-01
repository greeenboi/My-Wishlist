CREATE TABLE months (
    month TEXT PRIMARY KEY, -- YYYY-MM
    salary REAL NOT NULL CHECK (salary >= 0),
    budget REAL NOT NULL CHECK (budget >= 0)
);

CREATE TABLE items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    tag TEXT,
    link TEXT,
    price REAL NOT NULL CHECK (price >= 0),
    priority INTEGER NOT NULL DEFAULT 0,
    bought_month TEXT,
    bought_price REAL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_items_bought_month ON items (bought_month);
