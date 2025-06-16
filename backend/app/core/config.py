from pydantic import BaseSettings

class Setting(BaseSettings):
    port: int = 5000
    debug: bool = False
    db_url: str = ""

    class Config :
        env_file = ".env"

settings = Setting()