# -*- coding: utf-8 -*-

from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support.ui import Select
from selenium.common.exceptions import NoSuchElementException
import unittest, time, re


class BlogDriver(unittest.TestCase):
	def setUp(self):
		self.driver =webdriver.Firefox()
		self.driver.implicitly_wait(10)
		self.base_url = "http://127.0.0.1:8000/accounts/usernamelogin/"
		self.driver.get(self.base_url)
		
	def test_login(self):
		driver = self.driver
		
		#check the homepage
		self.assertIn('Oscar', self.driver.title)
		
		#the teacher login with is username and the password associate
		teacher = driver.find_element_by_id("id_username")
		self.assertEqual(
			teacher.get_attribute('get me'), None
		)
		teacher.send_keys('prof')
		teacher.send_keys(Keys.ENTER)
		time.sleep(1)
		driver.find_element_by_xpath("//input[@type='submit']").click()
		
		driver.find_element_by_id("id_password").send_keys('prof')
		driver.find_element_by_xpath("//input[@type='submit']").click()
		time.sleep(2)
		
		self.assertTrue(driver.current_url.endswith("/professor/dashboard/"))
		time.sleep(1)
		
		#here the teacher enter the class and add a new test for his student
		driver.find_element_by_link_text('Hankar').click()
		driver.find_element_by_link_text('Mes Tests').click()
		driver.find_element_by_css_selector('img.icon').click()
		driver.find_element_by_link_text('Ajouter un test en ligne').click()
		time.sleep(1)
		
		driver.find_element_by_id("test_name").send_keys("bartest_new")
		driver.find_element_by_id("addSkillToTestButtonForStage9").click()
		time.sleep(1)
		
		i = 0
		url = driver.current_url
		while(i <100 and url == driver.current_url):
			driver.find_element_by_css_selector('[ng-click="addNewTest()"]').click()
			i+=1
		time.sleep(6)
		
		element = driver.find_element_by_link_text("nouveau")
		self.assertTrue(driver.current_url.endswith("/modify/"))
		if element.is_displayed():
			element.click()
			print("Found the link!")
		else:
			print("not found")
		time.sleep(1)
		
		#creation of the barchart with all the integer needed and names
		driver.find_element_by_id('exercice-html').send_keys("Creer un diagramme en batonnets a partir des donnees suivantes")
		time.sleep(1)
		locator = [(By.XPATH, "*//input[@ng-model = 'question.instructions']")]
		for by, value in locator:
			try:
				driver.find_element(by, value).send_keys("diagramme en batonnets")
			except NoSuchElementException:
				return false
			pass
		time.sleep(1)
		select = Select(driver.find_element_by_xpath("*//select[@ng-model= 'question.type']"))
		select.select_by_value('chart-barchart')
		locators = [(By.XPATH, "*//input[@ng-model= 'answer.text']")]
		for by, value in locators:
			try:
				driver.find_element(by,value).send_keys("1-3 2-4 3-7")
			except NoSuchElementException:
				return false
			pass
		time.sleep(1)
		
		bar= driver.find_element_by_id("barGraphX")
		bar.clear()
		bar.send_keys("orange")
		time.sleep(1)
		bar1= driver.find_element_by_id("barGraphY")
		bar1.clear()
		bar1.send_keys("mangue")
		time.sleep(2)
		step = driver.find_element_by_id("stepX")
		step.clear()
		step.send_keys("2")
		step1 = driver.find_element_by_id("stepY")
		step1.clear()
		step1.send_keys("2")
		zer = driver.find_element_by_id("zeroX")
		zer.clear()
		zer.send_keys("-1")
		zer1 = driver.find_element_by_id("zeroY")
		zer1.clear()
		zer1.send_keys("-1")
		maxi = driver.find_element_by_id("maxX")
		maxi.clear()
		maxi.send_keys("10")
		time.sleep(3)
		maxi1 = driver.find_element_by_id("maxY")
		maxi1.clear()
		maxi1.send_keys("10")
		pres = driver.find_element_by_id("precisionValue")
		pres.clear()
		pres.send_keys("1")
		driver.find_element_by_xpath("//button[@ng-model='createBarChart']").click()
		time.sleep(1)
		
		supprimer = driver.find_element_by_css_selector('[onclick="chart_deleteLastBar($(this))"]')
		supprimer.click()
		time.sleep(10)
		
		barre = driver.find_element_by_id("newBarY")
		barre.clear()
		ajouter = driver.find_element_by_css_selector('[onclick="chart_add($(this))"]')
		time.sleep(3)
		barre.send_keys("4")
		ajouter.click()
		time.sleep(3)
		barre.clear()
		barre.send_keys("5")
		time.sleep(3)
		ajouter.click()
		time.sleep(3)
		barre.clear()
		barre.send_keys("7")
		time.sleep(3)
		ajouter.click()
		time.sleep(3)
		
		supprimer = driver.find_element_by_css_selector('[onclick="chart_deleteLastBar($(this))"]')
		supprimer.click()
		time.sleep(3)
		
		driver.find_element_by_id("validate-yaml").click()
		time.sleep(5)
		driver.find_element_by_id("submit-pull-request").click()
		time.sleep(5)
		driver.find_element_by_xpath(" *//a[@class = 'btn btn-lg btn-primary']").click()
		time.sleep(10)
		driver.find_element_by_link_text("Retour aux tests").click()
		time.sleep(3)
		
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
