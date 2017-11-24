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

        driver.get("http://127.0.0.1:8000/professor/lesson/134/test/online/470/modify/")
        """""
        driver.find_element_by_link_text('Hankar').click()
        driver.find_element_by_link_text('Mes Tests').click()
        driver.find_element_by_css_selector('img.icon').click()
        driver.find_element_by_link_text('Ajouter un test en ligne').click()

        driver.find_element_by_id("addSkillToTestButtonForStage9").click()
        driver.find_element_by_id("test_name").send_keys("tr")
        leme = driver.find_element(By.xpath("/button[@type='submit']"))
        leme.click()
        driver.find_element_by_link_text("nouveau").click()
        #driver.find_element_by_id("validate-yaml")
        """
        driver.find_element_by_link_text("nouveau").click()
        driver.find_element_by_id('exercice-html').send_keys("ffzffs")
        driver.find_element_by_css_selector('input.form-control.ng-pristine.ng-invalid.ng-invalid-required').click()
        #driver.find_element_by_css_selector('input.form-control.ng-dirty.ng-valid.ng-valid-required').send_keys("dfs")
        #driver.find_element_by_css_selector("select").click()
        #driver.find_element_by_xpath("*//select[@ng-model = 'question.type']/option[text()='chart-barchart']").click()

        select = Select(driver.find_element_by_xpath(" *//select[@ng-model = 'question.type']"))
        select.select_by_value('chart-piechart')
        driver.find_element_by_xpath(" *//input[@ng-model = 'question.instructions']").send_keys("sggdgs")
        driver.find_element_by_xpath(" *//input[@ng-model = 'answer.text']").send_keys("sggdgdfhsfkhskghksks")

        #elem = driver.find_element_by_xpath(" *//input[@ng-model = 'sector']").send_keys("90")
        #driver.find_element_by_css_selector('input.efhq.qhfksh').click()
        driver.find_element_by_xpath(" *//input[@onclick='chart_createPieChartFromForm()']")
        time.sleep(3)
        driver.find_element_by_id("sector").send_keys("180")
        driver.find_element_by_css_selector('button.btn.btn-success.btn-addPie').click()
        time.sleep(10)
        driver.find_element_by_xpath(" *//input[@onclick='chart_createPieChartFromForm()']")
        #driver.find_element_by_xpath(" *//button[@onclick= 'chart_createPieChartFromForm()']").click()
        elem = driver.find_element_by_id("sector").send_keys("90")
        driver.find_element_by_css_selector('button.btn.btn-success.btn-addPie').click()
        #driver.find_element_by_xpath(" *//button[@onclick= 'chart_createPieChartFromForm()']").click()
        time.sleep(10)
        #driver.find_element("deaof")
        #driver.find_element_by_xpath(" *//button[@type= 'submit']").click()
        #driver.find_element_by_id("validate-yaml")
        #self.assertRaises()





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
