# ================================
# cities_crud.py
# ================================

# ---------- Utility Functions ----------

def read_all_records(file_name='cities.txt'):
    """
    Reads all non-empty lines from the data file and returns them as a list.
    Handles the case where the file does not exist by returning an empty list.
    """
    try:
        with open(file_name, 'r') as file:
            records = [line.strip() for line in file if line.strip()]
        return records
    except FileNotFoundError:
        # If file doesn’t exist yet, return empty list
        return []


def write_all_records(records, file_name='cities.txt'):
    """
    Writes the given list of records to the data file, overwriting any existing data.
    Each record is written on its own line.
    """
    with open(file_name, 'w') as file:
        for record in records:
            file.write(record + '\n')


# ---------- CRUD Operations ----------

def create_record(new_record, file_name='cities.txt'):
    """
    Adds a new record to the data file by appending it to the end.
    """
    with open(file_name, 'a') as file:
        file.write(new_record + '\n')
    print(f"Record '{new_record}' added successfully.")


def read_records(file_name='cities.txt'):
    """
    Reads all records and displays them in a formatted, numbered list.
    Returns the list of records for further use.
    """
    records = read_all_records(file_name)
    if not records:
        print("No records found.")
        return []

    print("\nCurrent Records:")
    for index, record in enumerate(records, start=1):
        print(f"{index}. {record}")
    return records


def update_record(index, new_value, file_name='cities.txt'):
    """
    Updates the record at the given (1-based) index with a new value.
    """
    records = read_all_records(file_name)
    idx = index - 1  # Adjust from 1-based to 0-based

    if 0 <= idx < len(records):
        old_value = records[idx]
        records[idx] = new_value
        write_all_records(records, file_name)
        print(f"Record '{old_value}' updated to '{new_value}'.")
    else:
        print("Invalid record number.")


def delete_record(index, file_name='cities.txt'):
    """
    Deletes the record at the given (1-based) index from the file.
    """
    records = read_all_records(file_name)
    idx = index - 1  # Adjust from 1-based to 0-based

    if 0 <= idx < len(records):
        deleted = records.pop(idx)
        write_all_records(records, file_name)
        print(f"Record '{deleted}' deleted successfully.")
    else:
        print("Invalid record number.")


# ---------- Optional: Simple CLI Interface ----------

if __name__ == "__main__":
    while True:
        print("\n--- City Records Management ---")
        print("1. Create Record")
        print("2. Read Records")
        print("3. Update Record")
        print("4. Delete Record")
        print("5. Exit")

        choice = input("Enter your choice (1-5): ")

        if choice == '1':
            city = input("Enter city name: ")
            create_record(city)

        elif choice == '2':
            read_records()

        elif choice == '3':
            records = read_records()
            if records:
                try:
                    index = int(input("Enter record number to update: "))
                    new_value = input("Enter new city name: ")
                    update_record(index, new_value)
                except ValueError:
                    print("Please enter a valid number.")

        elif choice == '4':
            records = read_records()
            if records:
                try:
                    index = int(input("Enter record number to delete: "))
                    delete_record(index)
                except ValueError:
                    print("Please enter a valid number.")

        elif choice == '5':
            print("Exiting program.")
            break

        else:
            print("Invalid choice. Please try again.")
