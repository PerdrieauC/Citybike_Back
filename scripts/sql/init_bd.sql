CREATE DATABASE citybike

CREATE TABLE IF NOT EXISTS "user" (
    "user_id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "username" VARCHAR(255) UNIQUE NOT NULL,
    "email" VARCHAR(255) UNIQUE NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "first_name" VARCHAR(255),
    "last_name" VARCHAR(255),
    "dateDeCreation" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "dateDeModification" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "dateDeSuppression" TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "product" (
    "product_id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "seller_id" UUID REFERENCES "user"("user_id") ON DELETE CASCADE,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "price" NUMERIC NOT NULL,
    "quantity_available" INTEGER NOT NULL,
    "category" VARCHAR(255) NOT NULL,
    "img" varchar(255) NOT NULL,
    "dateDeCreation" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "dateDeModification" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "dateDeSuppression" TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "order" (
    "order_id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "buyer_id" UUID REFERENCES "user"("user_id") ON DELETE CASCADE,
    "product_id" UUID REFERENCES "product"("product_id") ON DELETE CASCADE,
    "quantity_ordered" INTEGER NOT NULL,
    "total_price" NUMERIC NOT NULL,
    "order_date" TIMESTAMP NOT NULL,
    "dateDeCreation" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "dateDeModification" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "dateDeSuppression" TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "favorite" (
    "favorite_id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "user_id" UUID REFERENCES "user"("user_id") ON DELETE CASCADE,
    "product_id" UUID REFERENCES "product"("product_id") ON DELETE CASCADE,
    "dateDeCreation" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "dateDeModification" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "dateDeSuppression" TIMESTAMP
);

CREATE TABLE "cart" (
    "cart_id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "user_id" UUID REFERENCES "user"("user_id") ON DELETE CASCADE,
    "product_id" UUID REFERENCES "product"("product_id") ON DELETE CASCADE,
    "quantity" INTEGER NOT NULL,
    "dateDeCreation" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "dateDeModification" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "dateDeSuppression" TIMESTAMP
);

CREATE OR REPLACE FUNCTION update_dateDeModification()
RETURNS TRIGGER AS $$
BEGIN
  NEW."dateDeModification" = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
