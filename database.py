import os
import mysql.connector
import atexit

sql_endpoint = os.getenv('SQL_ENDPOINT', '127.0.0.1')
sql_user = os.getenv('SQL_USER', 'root')
sql_password = os.getenv('SQL_PASSWORD', 'root')

print(sql_endpoint)
print(sql_user)
print(sql_password)

connection = None
cursor = None

def connect_to_database():
    global connection, cursor
    try:
        connection = mysql.connector.connect(
            host=sql_endpoint,
            user=sql_user,
            password=sql_password,
        )
        cursor = connection.cursor()
        print("SQL connected successfully")
    except mysql.connector.Error as e:
        print("Error connecting to MySQL", e)

def close_database_connection():
    global connection
    if connection:
        connection.close()
        print("SQL connection closed")

def drop_phone_column():
    try:
        cursor.execute('ALTER TABLE person DROP COLUMN IF EXISTS phone;')
        connection.commit()
    except mysql.connector.Error as e:
        print("Error while dropping phone column", e)

def create_person_table():
    try:
        cursor.execute('CREATE DATABASE IF NOT EXISTS TaiKhoan')
        connection.commit()

        cursor.execute('USE TaiKhoan')

        command = """
        CREATE TABLE IF NOT EXISTS person (
            username VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL,
            PRIMARY KEY (username)
        );
        """
        cursor.execute(command)
        connection.commit()
        
        if not check_login_sql('admin', '1'):
            insert_new_person('admin', 'admin@example.com', '1')
    except mysql.connector.Error as e:
        print("Error while creating table", e)

def insert_new_person(username: str, email: str, password: str):
    try:
        command = "INSERT INTO person (username, email, password) VALUES (%s, %s, %s);"
        cursor.execute(command, (username, email, password))
        connection.commit()
        return [None]
    except mysql.connector.Error as e:
        print("Error while inserting into MySQL", e)
        return [e]

def check_login_sql(username: str, password: str):
    try:
        command = "SELECT password FROM person WHERE username = %s;"
        cursor.execute(command, (username,))
        result = cursor.fetchone()
        if result:
            stored_password = result[0]
            return stored_password == password
        return False
    except mysql.connector.Error as e:
        print("Error while querying MySQL", e)
        return False

atexit.register(close_database_connection)
connect_to_database()
create_person_table()

if __name__ == "__main__":
    if check_login_sql('admin', '1'):
        print("Admin login successful")
    else:
        print("Admin login failed")


def insert_study_plan(title, start_time, end_time):
    # Implement the logic to insert a study plan into the database
    # This is a placeholder implementation
    try:
        # Example: Insert into a hypothetical database
        # db.execute("INSERT INTO study_plans (title, start_time, end_time) VALUES (?, ?, ?)", (title, start_time, end_time))
        return True
    except Exception as e:
        print(f"Error inserting study plan: {e}")
        return False

def insert_gpa(subject, grade_10, grade_4, letter_grade, target_grade):
    # Implement the logic to insert GPA into the database
    # This is a placeholder implementation
    try:
        # Example: Insert into a hypothetical database
        # db.execute("INSERT INTO gpa (subject, grade_10, grade_4, letter_grade, target_grade) VALUES (?, ?, ?, ?, ?)", (subject, grade_10, grade_4, letter_grade, target_grade))
        return True
    except Exception as e:
        print(f"Error inserting GPA: {e}")
        return False
