from flask import Flask, jsonify, request
from flask_cors import CORS
import psycopg

connection = psycopg.connect(
    host='localhost',
    dbname='hosilist',
    user='postgres',
    password='password',
)
app = Flask(__name__)
cors = CORS(app)

@app.route("/list1")
def getList1():
    sql = '''
    SELECT * FROM "リスト1";
    '''
    cursor = connection.cursor()
    cursor.execute(sql)
    results = cursor.fetchall()

    person_list = []
    for result in results:
        person_data = {
            "商品名": result[0], 
            "値段": result[1],
            "購入ページURL": result[2]
        }
        person_list.append(person_data)

    return jsonify(person_list)

# @app.route("/personcount")
# def getPersonCount():
#     sql = '''
#     SELECT COUNT(*) FROM "人物データ";
#     '''
#     cursor = connection.cursor()
#     cursor.execute(sql)
#     results = cursor.fetchone()
    
#     return jsonify({"登録人数": results[0]})

@app.route("/list1", methods=["post"])
def postList1():
    content = request.get_json()
    
    try:
        sql = '''
        INSERT INTO "リスト1" ("商品名", "値段", "購入ページURL") 
        VALUES (%s, %s, %s);
        '''
        values = (content['商品名'], content['値段'], content['購入ページURL'])
        cursor = connection.cursor()
        cursor.execute(sql, values)
    except Exception as e:
        print("Error:", e)
        connection.rollback()
    else:
        connection.commit()
    
    return 1
