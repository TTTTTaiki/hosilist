DROP TABLE IF EXISTS ほしリスト;
CREATE TABLE ほしリスト (
  リストID SERIAL REFERENCES リストグループ(リストID) ON DELETE CASCADE,
  登録ID SERIAL NOT NULL,
  商品名 TEXT NOT NULL,
  値段 INTEGER NOT NULL,
  購入ページURL CIDR,
  PRIMARY KEY (リストID,登録ID)
);

DROP TABLE IF EXISTS リストグループ;
CREATE TABLE リストグループ (
  リストID SERIAL PRIMARY KEY NOT NULL,
  リスト名 TEXT NOT NULL
);

SELECT * FROM "ほしリスト";

SELECT リストグループ.リスト名, 商品名, 値段, 購入ページURL
FROM リストグループ, ほしリスト
WHERE リストグループ.リストID = ほしリスト.リストID;

insert into ほしリスト (リストID, 商品名, 値段)
values (1, 'ペン', 1000);
