# encoding: utf-8

from __future__ import unicode_literals
from django.db import models
from django.contrib.postgres.fields import JSONField
from datetime import datetime
from django.core.urlresolvers import reverse
from django.contrib.auth.models import User
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
import yaml
import yamlordereddictloader
import json
import re


def evaluate_chart(question, response):
    raw_correct_answers = question.get_answer()
    evaluation_type = raw_correct_answers["type"]

    if evaluation_type == "chart-barchart":
        #TODO
        return 1
    else:
        return 1
    if evaluation_type == "chart-piechart":
        #TODO
        return 1
    else:
        return 1
    if evaluation_type == "chart-frequencychart":
        #TODO
        return 1
    else:
        return 1
