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
	time.sleep(3)

	driver.find_element_by_link_text('Hankar').click()
        driver.find_element_by_link_text('Mes Tests').click()
        driver.find_element_by_css_selector('img.icon').click()
        driver.find_element_by_link_text('Ajouter un test en ligne').click()
	time.sleep(3)

	driver.find_element_by_id("test_name").send_keys("tr")
	driver.find_element_by_id("addSkillToTestButtonForStage9").click()
	driver.find_element_by_css_selector('[ng-click="addNewTest()"]').click()
	time.sleep(3)

	driver.find_element_by_link_text("nouveau").click()
	time.sleep(3)

        driver.find_element_by_id('exercice-html').send_keys("ffzffs")
        driver.find_element_by_css_selector('input.form-control.ng-pristine.ng-invalid.ng-invalid-required').click()
        select = Select(driver.find_element_by_xpath(" *//select[@ng-model = 'question.type']"))
        select.select_by_value('chart-piechart')
        driver.find_element_by_xpath(" *//input[@ng-model = 'question.instructions']").send_keys("sggdgs")
        driver.find_element_by_xpath(" *//input[@ng-model = 'answer.text']").send_keys("3")
	driver.find_element_by_id("sector").clear()
	driver.find_element_by_id("sector").send_keys("90")
	driver.find_element_by_id("labelPie").clear()
	driver.find_element_by_id("labelPie").send_keys("rouge")
	driver.find_element_by_css_selector('[onclick="chart_createPieChartFromForm()"]').click()
	driver.find_element_by_css_selector('[onclick="chart_createPieChartFromForm()"]').click()
	time.sleep(10)
	driver.find_element_by_id("sector").clear()
	driver.find_element_by_id("sector").send_keys("180")
	driver.find_element_by_id("labelPie").clear()
	driver.find_element_by_id("labelPie").send_keys("vert")
	time.sleep(10)
	driver.find_element_by_css_selector('[onclick="chart_createPieChartFromForm()"]').click()
	driver.find_element_by_css_selector('[onclick="chart_createPieChartFromForm()"]').click()
	time.sleep(10)
	driver.find_element_by_css_selector('[onclick ="chart_deleteLastPie($(this))"]').click()
	driver.find_element_by_css_selector('[onclick ="chart_deleteLastPie($(this))"]').click()
	time.sleep(10)
	driver.find_element_by_id("validate-yaml")


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
