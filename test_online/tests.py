# coding: utf-8

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support.ui import Select
from selenium.common.exceptions import NoSuchElementException
import unittest, time, re


class BlogDriver(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Firefox()
        self.driver.implicitly_wait(30)
        self.base_url = "http://127.0.0.1:8000/accounts/usernamelogin/"
        self.driver.get(self.base_url)

    def test_log_in(self):
        driver = self.driver
        driver.find_element_by_id("id_username").send_keys("prof")
        driver.find_element_by_xpath("//input[@type='submit']").click()

        driver.find_element_by_id("id_password").send_keys("prof")
        driver.find_element_by_xpath("//input[@type='submit']").click()

        driver.find_element_by_link_text('4ème transition').click()
        driver.find_element_by_link_text('Mes Tests').click()
        driver.find_element_by_css_selector('img.icon').click()
        driver.find_element_by_link_text('Ajouter un test en ligne').click()

        driver.find_element_by_id("test_name").send_keys("tr")
        driver.find_element_by_css_selector('select.form-control.ng-valid.ng-dirty').click()
        driver.find_element_by_id("addSkillToTestButtonForStage13").click()
        driver.find_element_by_xpath("//input[@type='submit']").click()
        driver.find_element_by_link_text("modifier").click()
        driver.find_element_by_id("validate-yaml").click()



    def is_element_present(self, how, what):
        try:
            self.driver.find_element(by=how, value=what)
        except NoSuchElementException, e:
            return False
        return True


    def tearDown(self):
        self.driver.quit()


if __name__ == "__main__":
    unittest.main()
