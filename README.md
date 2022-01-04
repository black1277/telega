### telegram bot

остановить приложение
```shell script
heroku ps:scale web=0
```

запустить приложение
```shell script
heroku ps:scale web=1
```
    
посмотреть логи запущенного приложения    
```shell script
heroku logs --app=tele-bot-serv --tail
```
