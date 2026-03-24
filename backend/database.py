import sqlite3

def init_db():
    conn = sqlite3.connect('script.db')
    cursor = conn.cursor()
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS script (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        topic TEXT,
        prompt TEXT,
        script TEXT,
        title TEXT,
        hooks TEXT,
        created_at TIMESTAMP
    )
    ''')
    conn.commit()
    conn.close()

def save_script(topic, prompt, script, title, hooks):
    conn = sqlite3.connect('script.db')
    cursor = conn.cursor()
    sql_insert_query = """INSERT INTO script (topic, prompt, script, title, hooks) VALUES (?, ?, ?, ?, ?)"""
    cursor.execute(sql_insert_query, (topic, prompt, script, title, hooks))
    conn.commit()
    conn.close()

def get_all_scripts():
    conn = sqlite3.connect('script.db')
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM script")
    rows = cursor.fetchall()
    conn.close()
    return rows

if __name__ == '__main__':
    init_db()
    print("Database initialized successfully")










