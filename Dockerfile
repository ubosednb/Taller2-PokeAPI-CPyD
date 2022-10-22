FROM python:3.8-slim-buster

WORKDIR /app

COPY ./requirements.txt .

RUN pip install -r requirements.txt

EXPOSE 5050

COPY . .
CMD ["flask", "--app","app","run"]
