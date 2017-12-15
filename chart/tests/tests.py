#!/usr/bin/env python3
# coding: utf-8

# Add your tests in this file
# pyhamcrest has to be installed
# doc: http://pyhamcrest.readthedocs.io/en/release-1.8/tutorial/

import unittest
from selenium import webdriver
from selenium.webdriver.comm.keys import Keys
from selenium.webdriver.support.ui import Select
from selenium.webdriver.support import WebDriverWait

class TeacherSide(unittest.TestCase):
	
	def setUp(self):
		self.driver = webdriver.Firefox()
		driver = self.driver
		driver.get("http://127.0.01:8000")
		wait = WebDriverWait(driver, 10)
		#assert "No results found." not in driver.page_source
		
	def tearDown(self):
		self.driver.close()

if __name__ == '__main__':
	unittest.main()

